package jetsennet.jsmp.nav.syn;

import jetsennet.jsmp.nav.media.jms.DataSynEntity;
import jetsennet.jsmp.nav.media.jms.DataSynXmlParse;
import junit.framework.TestCase;

public class DataSynXmlParseTest extends TestCase
{

	public void testTrans()
	{
		String xml = null;

		xml =
			"<copPortalMsg><header><messageID>1408011013359</messageID><sendID>JCOP</sendID><recvID>Portal</recvID><opCode>COP_PORTAL_META_PUB</opCode><time>1408011013359</time><responseUrl>null</responseUrl><msgType>REQUEST</msgType></header><body><fileTable opFlag=\"0\"><NS_FILEITEM><FILE_ID>345a15a8-0bf4-4185-b046-5a52d0b08b8c_54</FILE_ID><CMOBJ_ID>e24ee37b-f39d-4eb3-a616-e8acc9e41979</CMOBJ_ID><ASSET_ID>JETSEN345a15a8-0bf4-4185-b046-5a52d0b08b8cITEM</ASSET_ID><PGM_ID>54</PGM_ID><PGM_ASSETID>jetsenUEEC0000000000000042</PGM_ASSETID><FILE_TYPE>0</FILE_TYPE><DEST_PATH>X:\\\\temp\\trans\\20140808\\</DEST_PATH><DEST_FILENAME>20140808_6f7b85f2-1eec-4606-ad1c-c543b204767e.ts</DEST_FILENAME><FILE_SIZE>53846584</FILE_SIZE><FILE_MD>null</FILE_MD><FILE_DESC>null</FILE_DESC><DURATION>null</DURATION><IF_3D>0</IF_3D><VIDEO_QUALITY>2</VIDEO_QUALITY><ASPECT_RATIO>16 : 9</ASPECT_RATIO><BROWSE_HEIGHT>1080</BROWSE_HEIGHT><BROWSE_WIDTH>1920</BROWSE_WIDTH><GOP_SIZE>30</GOP_SIZE><TOTAL_FRAMES>0</TOTAL_FRAMES><FRAME_RATE>25</FRAME_RATE><CHANNEL_NUM>2</CHANNEL_NUM><AUCODING_FORMAT>AAC2 encode</AUCODING_FORMAT><VICODING_FORMAT>X264 encode</VICODING_FORMAT><AUDIO_DATARATE>128000</AUDIO_DATARATE><VIDEO_BITRATE>5000000</VIDEO_BITRATE><VIDEO_BITRATE_MODE>CBR</VIDEO_BITRATE_MODE><DEPTH>0</DEPTH><SCALE>1</SCALE><CHROMA_FMT>4 : 2 : 0</CHROMA_FMT><SCAN_TYPE>interlaoed-bottomFirst</SCAN_TYPE><AFD>0</AFD><PROFILE>null</PROFILE><VLEVEL>null</VLEVEL><FREQ>48000</FREQ><SAMPLES>0</SAMPLES><BIE_PER_SAMPLE>16</BIE_PER_SAMPLE><AUDIO_BITRATE_MODE>CBR</AUDIO_BITRATE_MODE><MUX_TYPE>null</MUX_TYPE><MUX_BITRATE>0</MUX_BITRATE><CP_ID>0</CP_ID><CP_CODE>null</CP_CODE><CP_NAME>null</CP_NAME><UPDATE_TIME>1408011013359</UPDATE_TIME><PLAY_URL>http://192.168.8.216/hls/JETSEN345a15a8-0bf4-4185-b046-5a52d0b08b8cITEM/JETSEN345a15a8-0bf4-4185-b046-5a52d0b08b8cITEM.m3u8</PLAY_URL></NS_FILEITEM></fileTable></body></copPortalMsg>";
		DataSynEntity parseDs = DataSynXmlParse.parseXml(xml);
		assertNotNull(parseDs);
	}

}
