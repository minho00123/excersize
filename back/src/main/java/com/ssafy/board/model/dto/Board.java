package com.ssafy.board.model.dto;

import lombok.Data;

@Data
public class Board {
	private int num;
	private String id;
	private String title;
	private String content;
	private int viewCnt;
	private String regDate;
}
