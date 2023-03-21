package com.ssafy.board.model.dto;

import lombok.Data;

@Data
public class User {
	private int seq;
	private String userId;
	private String pw;
	private String nickname;
}
