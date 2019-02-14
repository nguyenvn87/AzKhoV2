package com.kito.madina.sample.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.RoomTurnVO;
import javax.annotation.Resource;

@Repository
public class SampleRoomTurnDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<RoomTurnVO> getListRoomTurnVoByVO(RoomTurnVO vo){
		
		List<RoomTurnVO> queryForList = (List<RoomTurnVO>) getSqlMapClientTemplate().queryForList("getListRoomTurnVoByVO", vo);
		return queryForList;
	 }
	 public RoomTurnVO getRoomTurnVOByObject(RoomTurnVO vo){
		 RoomTurnVO record = (RoomTurnVO) getSqlMapClientTemplate().queryForObject("getRoomTurnVOByObject", vo);
		 return record;
	 }
	 public int CreateRoomTurnVO(RoomTurnVO vo){
			//vo.setROOM_ID(CmmUtil.getGUID());
			Object i = getSqlMapClientTemplate().insert("createRoomTurnVO", vo);
			return 1;
	}
	 public int UpdateRoomTurnVO(RoomTurnVO vo){
			Object i = getSqlMapClientTemplate().update("updateRoomTurnVO", vo);
			return 1;
	}
	public int createRoomTurnHistoryVO(RoomTurnVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().insert("createRoomTurnHistoryVO", vo);
		return 1;
	}
}
