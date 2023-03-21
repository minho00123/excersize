package com.ssafy.board.model.service;

import java.util.HashMap;
import java.util.List;

import com.ssafy.board.model.dto.Board;
import com.ssafy.board.model.dto.User;

public interface BoardService {
	//글쓰기
	void writeBoard(Board board);
	//글수정
	boolean modifyBoard(Board board, User user) throws Exception;
	//글삭제
	boolean deleteBoard(int num);
	//조회수 증가
	void updateCnt(int num);
	//글 얻어오기
	Board getBoardByNum(int num);
	//글 읽기
	Board readBoard(int num);
	//모든게시물 조회
	List<Board> getBoardList(HashMap<String, String> params);
}
