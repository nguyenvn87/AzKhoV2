package com.kito.madina.ecount.dao;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Repository;
import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.ibatis.sqlmap.client.SqlMapClient;
import com.kito.madina.cmmn.util.SessionUtil;
import com.kito.madina.ecount.vo.PaymentMethodVO;

import javax.annotation.Resource;

@Repository
public class PaymentMethodDAO extends SqlMapClientDaoSupport{
	 private static final String NAMESPACE = "srvc";
	 
	 @Resource(name="sqlMapClient")
	 public void setSuperSqlMapClient(SqlMapClient sqlMapClient) {
	        super.setSqlMapClient(sqlMapClient);
	 }

	public List<PaymentMethodVO> getPaymentMethodVOByVO(PaymentMethodVO vo) {
		// TODO Auto-generated method stub
		return null;
	}
	public HashMap<String, Object> getMethodListCount(PaymentMethodVO vo) {
		// TODO Auto-generated method stub
		return null;
	}

	public int createPaymentMethodVO(PaymentMethodVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().insert("createPaymentMethodVO", vo);
		return 1;
	}

	public int updatePaymentMethodVO(PaymentMethodVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().update("updatePaymentMethodVO", vo);
		return 1;
	}
	public List<PaymentMethodVO> getListPaymentMethod(PaymentMethodVO map){
		List<PaymentMethodVO> record = (List<PaymentMethodVO>) getSqlMapClientTemplate().queryForList("getPaymentMethodByIndex", map);
		return record;
	}

	public int deletePaymentMethodByRoomTurnId(PaymentMethodVO vo) {
		// TODO Auto-generated method stub
		Object i = getSqlMapClientTemplate().delete("deletePaymentMethodByRoomTurnId", vo);
		return 0;
	}
	 
}
