package jetsennet.jsmp.nav.media.jms;

import java.util.List;

import jetsennet.jsmp.nav.entity.ProgramEntity;
import jetsennet.jsmp.nav.media.cache.ProgramCache;
import jetsennet.jsmp.nav.media.db.DbHelper;
import jetsennet.jsmp.nav.media.db.ProgramDal;
import jetsennet.jsmp.nav.util.IdentAnnocation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@IdentAnnocation("programTable")
public class JmsMsgHandleProgram extends AbsJmsMsgHandle
{

	private static final Logger logger = LoggerFactory.getLogger(JmsMsgHandleProgram.class);

	@Override
	public void handleModify(DataSynContentEntity content)
	{
		List<Object> objs = content.getObjs();
		for (Object obj : objs)
		{
			//			DataSynDbResult dbResult = 
			DbHelper.insertOrUpdate(obj);
		}
		ProgramCache.insert(objs);
	}

	@Override
	public void handleDelete(DataSynContentEntity content)
	{
		ProgramDal dal = new ProgramDal();
		List<Object> objs = content.getObjs();
		for (Object obj : objs)
		{
			ProgramEntity pgm = null;
			if (obj instanceof ProgramEntity)
			{
				pgm = (ProgramEntity) DbHelper.checkObj(obj);
				dal.deleteProgram(pgm.getPgmId());
				ProgramCache.delete(pgm);
			}
			else
			{
				logger.error("JmsMsgHandleProgram.handleDelete不处理：" + obj);
			}
		}
	}
}