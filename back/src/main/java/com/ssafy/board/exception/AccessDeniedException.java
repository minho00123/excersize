package com.ssafy.board.exception;

public class AccessDeniedException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public AccessDeniedException() {
		super("수정 권한이 없습니다.");
	}
}	
