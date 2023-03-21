package com.ssafy.board.model.service;

import com.ssafy.board.model.dto.User;

public interface UserService {
	void join(User user) throws Exception;
	boolean login(String userId, String pw) throws Exception;
	String getNickNameByUserId(String userId);
}
