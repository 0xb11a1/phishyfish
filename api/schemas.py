from pydantic import BaseModel


class Login(BaseModel):
    username: str
    password: str

class Notification(BaseModel):
    msg: str
    
class Client(BaseModel):
    id: int
    ip: str
    # user_agent: str
    username: str
    password: str
    # Creds: list[Creds] = []

    class Config:
        orm_mode = True


class Visitors(BaseModel):
    id: str
