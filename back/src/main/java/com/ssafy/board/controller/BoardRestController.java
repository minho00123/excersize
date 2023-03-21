package com.ssafy.board.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.board.exception.BoardNotFoundException;
import com.ssafy.board.model.dto.Board;
import com.ssafy.board.model.dto.User;
import com.ssafy.board.model.service.BoardService;

@RestController
@RequestMapping("/api")
public class BoardRestController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private BoardService boardService;

	@GetMapping("/board")
	public ResponseEntity<List<Board>> list(@RequestParam(defaultValue = "") String mode,
			@RequestParam(defaultValue = "") String keyword) {

		HashMap<String, String> params = new HashMap<String, String>();
		params.put("mode", mode);
		params.put("keyword", keyword);
		return new ResponseEntity<List<Board>>(boardService.getBoardList(params), HttpStatus.OK);
	}
	
	@PostMapping("/board")
	public ResponseEntity<String> write(Board board){
		boardService.writeBoard(board);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
	}
	

	@PostMapping("/board/update")
	public ResponseEntity<String> update(Board board, User user) throws Exception{
		boardService.modifyBoard(board, user); //결과 boolean 이니까 가져다가 써도 좋다.
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@GetMapping("/board/{num}")
	public ResponseEntity<Board> detail(@PathVariable int num) {
		try {
			return new ResponseEntity<Board>(boardService.readBoard(num), HttpStatus.OK);
		}catch (Exception e) {
			throw new BoardNotFoundException(num +"번 게시글은 없습니다.");		
		}
	}
	
	@DeleteMapping("/board/{num}")
	public ResponseEntity<String> delete(@PathVariable int num){
		if(boardService.deleteBoard(num)) {
			return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
		}
		return new ResponseEntity<String>(FAIL, HttpStatus.NO_CONTENT);
	}
	
	
	

}