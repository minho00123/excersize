package com.ssafy.board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.board.model.dao.VideoDao;
import com.ssafy.board.model.dto.Video;

@Service("videoService")
public class VideoServicelmpl implements VideoService {

	@Autowired
	private VideoDao videoDao;
		
	@Override
	public void addLikeVideo(Video video) {
		videoDao.addLikeVideo(video);
	}
	@Override
	public void deleteLikeVideo(Video video) {
		// TODO Auto-generated method stub
		videoDao.deleteLikeVideo(video);
	}
	@Override
	public List<Video> getLikeListByUserID(String userId) {
		// TODO Auto-generated method stub
		return videoDao.getLikeListByUserID(userId);
	}
	

	
	
}
