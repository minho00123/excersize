package com.ssafy.board.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.board.exception.IdExistingException;
import com.ssafy.board.exception.PWIncorrectException;
import com.ssafy.board.exception.UserNotFoundException;
import com.ssafy.board.model.dao.UserDao;
import com.ssafy.board.model.dto.User;
import com.ssafy.board.util.SHA256;

@Service("userService")
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserDao userDao;

	
	@Transactional
	@Override
	public void join(User user) throws Exception {
		// TODO Auto-generated method stub
		if (userDao.selectByUserId(user.getUserId()) != null) {
			throw new IdExistingException();
		}else {
		user.setPw( new SHA256().getHash(user.getPw()));
		userDao.insertUser(user);
		}
	}

	@Override
	public boolean login(String userId, String pw) throws Exception {
		// TODO Auto-generated method stub
		User user = userDao.selectByUserId(userId);
		if( user == null )
			throw new UserNotFoundException();
		if( !user.getPw().equals( new SHA256().getHash(pw) ) )
			throw new PWIncorrectException();
		else
			return true;
	}

	@Override
	public String getNickNameByUserId(String userId) {
		// TODO Auto-generated method stub
		return userDao.getNickNameByUserId(userId);
	}
}
