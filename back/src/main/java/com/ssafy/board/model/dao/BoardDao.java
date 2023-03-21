package com.ssafy.board.model.dao;

import java.util.HashMap;
import java.util.List;

import com.ssafy.board.model.dto.Board;

public interface BoardDao {
	//게시글 수정 update
	boolean updateBoard(Board board);
	//게시글 삭제 delete
	boolean deleteBoard(int num);
	//게시글 추가 insert
	void insertBoard(Board board);
	//게시글 조회 selectOne
	Board selectOne(int num);
	//게시글 목록 selectList
	List<Board> selectList(HashMap<String, String> params);
}
