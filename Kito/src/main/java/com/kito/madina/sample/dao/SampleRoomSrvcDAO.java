package com.kito.madina.sample.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.test.vo.RoomSrvcVO;
import javax.annotation.Resource;

@Repository
public class SampleRoomSrvcDAO extends SqlMapClientDaoSupport{
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<RoomSrvcVO> getListRoomSrvcVOByID(String vo){
		
		List<RoomSrvcVO> queryForList = (List<RoomSrvcVO>) getSqlMapClientTemplate().queryForList("getListRoomSrvcVOByID", vo);
		return queryForList;
	 }
	 public RoomSrvcVO getRoomSrvcVOByObject(RoomSrvcVO vo){
		 RoomSrvcVO record = (RoomSrvcVO) getSqlMapClientTemplate().queryForObject("getRoomSrvcVOByVo", vo);
		 return record;
	 }
	 public int CreateRoomSrvcVO(RoomSrvcVO vo){
			//vo.setROOM_ID(CmmUtil.getGUID());
			Object i = getSqlMapClientTemplate().insert("createRoomSrvcVO", vo);
			return 1;
	}
	 public int UpdateRoomSrvcVO(RoomSrvcVO vo){
				Object i = getSqlMapClientTemplate().update("updateRoomSrvcVO", vo);
				return 1;
	}
	 public int deleteRoomSrvcVoByID(int ID){
		 Object i = getSqlMapClientTemplate().delete("deleteRoomSrvcVoByID", ID);
		return 1;
	 }
}
