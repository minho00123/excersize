package com.ssafy.board.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.board.model.dto.User;
import com.ssafy.board.model.service.UserService;
import com.ssafy.board.util.JWTUtil;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/api")
public class UserController {
	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	private UserService userService;

	@PostMapping("/join")
	public ResponseEntity<String> join(User user) throws Exception {
		userService.join(user);
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@GetMapping("/logout")
	public ResponseEntity<String> logout() {
		// 여기짜야됨
		return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody User user){
		System.out.println(user);
		HttpStatus status = null;

		HashMap<String, Object> result = new HashMap<>();
		try {
			//user 정보를 이용하여 데이터베이스 확인
			//존재하면 토큰을 생성해서 결과에 넣어 반환
			if(user.getUserId() != null || user.getUserId().length() > 0) {
				String a = user.getUserId();
				String b = user.getPw();

				if (userService.login(a, b)) {
				System.out.println(user.getUserId());
				result.put("access-token", jwtUtil.createToken("id", user.getUserId()));
				result.put("message", SUCCESS);
				status = HttpStatus.ACCEPTED;}
				else {
					System.out.println("여기서발생");
					result.put("message", FAIL);
					status = HttpStatus.ACCEPTED;}
			}else {
				System.out.println("여기서발생");
				result.put("message", FAIL);
				status = HttpStatus.ACCEPTED;
			}
		}catch (Exception e) {
			System.out.println("여기로옴");
			result.put("message", FAIL);
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			// TODO: handle exception
		}
		return new ResponseEntity<Map<String,Object>>(result, status);
	}
}
