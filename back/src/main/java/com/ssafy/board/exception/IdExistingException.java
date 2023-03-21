package com.ssafy.board.exception;

public class IdExistingException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public IdExistingException() {
		super("이미 존재하는 아이디입니다.");
	}
}	
