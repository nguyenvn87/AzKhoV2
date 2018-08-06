package com.kito.madina.test.dao;

import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.CmmUtil;
import com.kito.madina.test.vo.RoomVO;
import javax.annotation.Resource;

@Repository
public class RoomDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "person.";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }
	 public List<RoomVO> getListRoomVoByRoomVO(RoomVO vo){
		
		List<RoomVO> queryForList = (List<RoomVO>) getSqlMapClientTemplate().queryForList("getListRoomVoByRoomVO", vo);
		return queryForList;
	 }
	 public RoomVO getRoomVoByObject(String _ID){
		 RoomVO object_ = new RoomVO();
		 object_.setROOM_ID(_ID);
		 RoomVO record = (RoomVO) getSqlMapClientTemplate().queryForObject("getRoomVoByObject", object_);
		 return record;
	 }
	 public int CreateRoomVO(RoomVO vo){
			vo.setROOM_ID(CmmUtil.getGUID());
			Object i = getSqlMapClientTemplate().insert("CreateRoomVO", vo);
			return 1;
	}
	 public int UpdateRoomVo(RoomVO vo){
				Object i = getSqlMapClientTemplate().update("UpdateRoomVo", vo);
				return 1;
	}
}
