/************************************************************************
日 期：2012-04-28
作 者: 郭祥
版 本：v1.3
描 述: 数据库配置对话框
历 史：
 ************************************************************************/
package jetsennet.jbmp.ui;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.swing.JOptionPane;

import org.apache.log4j.Logger;

import jetsennet.jbmp.util.DBTestUtil;
import jetsennet.jbmp.util.UIUtil;

/**
 * 数据库配置对话框
 * @author 郭祥
 */
public class DBTestDialog extends javax.swing.JDialog
{

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JTextField driverField;
    private javax.swing.JButton jButton1;
    private javax.swing.JButton jButton2;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JLabel jLabel3;
    private javax.swing.JLabel jLabel4;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JTextField pwdField;
    private javax.swing.JTextField urlField;
    private javax.swing.JTextField userField;
    // End of variables declaration//GEN-END:variables
    private static Logger logger = Logger.getLogger(DBTestDialog.class);

    private static final String DBCONFIG_FILE = "dbconfig.properties";
    private static final String PRO_FILE = "dbconfig.properties";

    private static final String BMP_DBPWD = "bmp_dbpwd";
    private static final String BMP_DBUSER = "bmp_dbuser";
    private static final String BMP_DBURL = "bmp_dburl";
    private static final String BMP_DRIVER = "bmp_driver";
    private static final String DMP_DBPWD = "dmp_dbpwd";
    private static final String DMP_DBUSER = "dmp_dbuser";
    private static final String DMP_DBURL = "dmp_dburl";
    private static final String DMP_DRIVER = "dmp_driver";
    private static final String NMP_DBPWD = "nmp_dbpwd";
    private static final String NMP_DBUSER = "nmp_dbuser";
    private static final String NMP_DBURL = "nmp_dburl";
    private static final String NMP_DRIVER = "nmp_driver";
    private static final String MMP_DBPWD = "mmp_dbpwd";
    private static final String MMP_DBUSER = "mmp_dbuser";
    private static final String MMP_DBURL = "mmp_dburl";
    private static final String MMP_DRIVER = "mmp_driver";
    private static final String UUM_DBPWD = "uum_dbpwd";
    private static final String UUM_DBUSER = "uum_dbuser";
    private static final String UUM_DBURL = "uum_dburl";
    private static final String UUM_DRIVER = "uum_driver";
    private static final String DB_PWD = "db.pwd";
    private static final String DB_USER = "db.user";
    private static final String DB_URL = "db.url";
    private static final String DB_DRIVER = "db.driver";

    private Properties props = new Properties();

    /**
     * @param parent 参数
     * @param modal 参数
     */
    public DBTestDialog(java.awt.Frame parent, boolean modal)
    {
        super(parent, modal);
        setTitle("数据库设置");
        initComponents();
        this.after();
    }

    /**
     * @param name 名称
     * @return 结果
     */
    public String getString(String name)
    {
        try
        {
            return props.getProperty(name);
        }
        catch (Exception ex)
        {
            logger.error(ex);
            return null;
        }
    }

    /**
     * 显示框
     */
    public void showDialog()
    {
        this.pack();
        UIUtil.setLocation(this);
        this.setVisible(true);
    }

    /**
     * This method is called from within the constructor to initialize the form. WARNING: Do NOT modify this code. The content of this method is
     * always regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents()
    {

        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        jLabel2 = new javax.swing.JLabel();
        jLabel3 = new javax.swing.JLabel();
        jLabel4 = new javax.swing.JLabel();
        driverField = new javax.swing.JTextField();
        urlField = new javax.swing.JTextField();
        userField = new javax.swing.JTextField();
        pwdField = new javax.swing.JPasswordField();
        jButton1 = new javax.swing.JButton();
        jButton2 = new javax.swing.JButton();

        setDefaultCloseOperation(javax.swing.WindowConstants.DISPOSE_ON_CLOSE);

        jPanel1.setBorder(javax.swing.BorderFactory.createTitledBorder(null, "数据库信息", javax.swing.border.TitledBorder.DEFAULT_JUSTIFICATION,
            javax.swing.border.TitledBorder.DEFAULT_POSITION, new java.awt.Font("宋体", 1, 12))); // NOI18N

        jLabel1.setText("驱动");

        jLabel2.setText("连接字符串");

        jLabel3.setText("用户名");

        jLabel4.setText("密码");

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(
            jPanel1Layout.createSequentialGroup().addContainerGap().addGroup(
                jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(
                    jPanel1Layout.createSequentialGroup().addComponent(jLabel1).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(driverField, javax.swing.GroupLayout.DEFAULT_SIZE, 410, Short.MAX_VALUE)).addGroup(
                    jPanel1Layout.createSequentialGroup().addComponent(jLabel2).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(urlField, javax.swing.GroupLayout.DEFAULT_SIZE, 410, Short.MAX_VALUE)).addGroup(
                    jPanel1Layout.createSequentialGroup().addComponent(jLabel3).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(userField, javax.swing.GroupLayout.DEFAULT_SIZE, 410, Short.MAX_VALUE)).addGroup(
                    jPanel1Layout.createSequentialGroup().addComponent(jLabel4).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                        .addComponent(pwdField, javax.swing.GroupLayout.DEFAULT_SIZE, 410, Short.MAX_VALUE))).addContainerGap()));

        jPanel1Layout.linkSize(javax.swing.SwingConstants.HORIZONTAL, new java.awt.Component[] { jLabel1, jLabel2, jLabel3, jLabel4 });

        jPanel1Layout.setVerticalGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(
            jPanel1Layout.createSequentialGroup().addContainerGap().addGroup(
                jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(jLabel1).addComponent(driverField,
                    javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(
                    jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(jLabel2).addComponent(urlField,
                        javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(
                    jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(jLabel3).addComponent(userField,
                        javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED).addGroup(
                    jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(jLabel4).addComponent(pwdField,
                        javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)));

        jButton1.setText("取消");
        jButton1.addActionListener(new java.awt.event.ActionListener()
        {
            public void actionPerformed(java.awt.event.ActionEvent evt)
            {
                jButton1ActionPerformed(evt);
            }
        });

        jButton2.setText("确定");
        jButton2.addActionListener(new java.awt.event.ActionListener()
        {
            public void actionPerformed(java.awt.event.ActionEvent evt)
            {
                jButton2ActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(
            layout.createSequentialGroup().addContainerGap().addGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE,
                    javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE).addGroup(
                    javax.swing.GroupLayout.Alignment.TRAILING,
                    layout.createSequentialGroup().addComponent(jButton2).addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
                        .addComponent(jButton1))).addContainerGap()));

        layout.linkSize(javax.swing.SwingConstants.HORIZONTAL, new java.awt.Component[] { jButton1, jButton2 });

        layout.setVerticalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(
            layout.createSequentialGroup().addContainerGap().addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE,
                javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE).addPreferredGap(
                javax.swing.LayoutStyle.ComponentPlacement.RELATED, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE).addGroup(
                layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE).addComponent(jButton1).addComponent(jButton2))
                .addContainerGap()));

        pack();
    }// </editor-fold>//GEN-END:initComponents

    private void jButton1ActionPerformed(java.awt.event.ActionEvent evt)
    {
        this.dispose();
    }

    private void jButton2ActionPerformed(java.awt.event.ActionEvent evt)
    {
        boolean isConn = DBTestUtil.testDB(driverField.getText(), urlField.getText(), userField.getText(), pwdField.getText());
        if (isConn)
        {
            // JOptionPane.showMessageDialog(this, "数据库连接成功", "消息", JOptionPane.INFORMATION_MESSAGE);
            try
            {
                saveConfig();
                logger.info("数据库设置成功");
                dispose();
            }
            catch (Exception e)
            {
                logger.error("数据库设置失败", e);
            }
        }
        else
        {
            JOptionPane.showMessageDialog(this, "数据库连接失败", "错误", JOptionPane.ERROR_MESSAGE);
        }
    }// GEN-LAST:event_jButton2ActionPerformed

    private void saveConfig() throws Exception
    {
        String driver = driverField.getText();
        String url = urlField.getText().replaceAll("\\:", "\\\\:").replaceAll("\\=", "\\\\=");
        String user = userField.getText();
        String pwd = pwdField.getText();

        Map<String, String> map = new HashMap<String, String>();
        map.put(DB_DRIVER, driver);
        map.put(DB_URL, url);
        map.put(DB_USER, user);
        map.put(DB_PWD, pwd);
        replace(new File(this.getClass().getClassLoader().getResource(PRO_FILE).toURI().getPath()), map);

        Map<String, String> map2 = new HashMap<String, String>();
        map2.put(UUM_DRIVER, driver);
        map2.put(UUM_DBURL, url);
        map2.put(UUM_DBUSER, user);
        map2.put(UUM_DBPWD, pwd);
        map2.put(NMP_DRIVER, driver);
        map2.put(NMP_DBURL, url);
        map2.put(NMP_DBUSER, user);
        map2.put(NMP_DBPWD, pwd);
        map2.put(MMP_DRIVER, driver);
        map2.put(MMP_DBURL, url);
        map2.put(MMP_DBUSER, user);
        map2.put(MMP_DBPWD, pwd);
        map2.put(DMP_DRIVER, driver);
        map2.put(DMP_DBURL, url);
        map2.put(DMP_DBUSER, user);
        map2.put(DMP_DBPWD, pwd);
        map2.put(BMP_DRIVER, driver);
        map2.put(BMP_DBURL, url);
        map2.put(BMP_DBUSER, user);
        map2.put(BMP_DBPWD, pwd);
        replace(new File(this.getClass().getClassLoader().getResource(DBCONFIG_FILE).toURI().getPath()), map2);
    }

    private void replace(File file, Map<String, String> map) throws Exception
    {
        Properties props = new Properties();
        props.load(new FileInputStream(file));
        Map<String, String> newMap = new HashMap<String, String>();
        for (Map.Entry<String, String> entry : map.entrySet())
        {
            String property = props.getProperty(entry.getKey());
            if (property == null)
            {
                continue;
            }
            newMap
                .put(entry.getKey() + "=" + property.replaceAll("\\:", "\\\\:").replaceAll("\\=", "\\\\="), entry.getKey() + "=" + entry.getValue());
        }

        StringBuffer sb = new StringBuffer();
        BufferedReader in = new BufferedReader(new InputStreamReader(new FileInputStream(file)));
        String tmp = null;
        while ((tmp = in.readLine()) != null)
        {
            String line = newMap.get(tmp);
            if (line != null)
            {
                sb.append(line).append("\r\n");
            }
            else
            {
                sb.append(tmp).append("\r\n");
            }
        }
        in.close();
        PrintWriter out = null;
        out = new PrintWriter(new BufferedWriter(new FileWriter(file)), true);
        out.println(sb.toString());
        out.close();
    }

    private void after()
    {
        try
        {
            props.load(this.getClass().getResourceAsStream("/" + PRO_FILE));
        }
        catch (IOException e)
        {
            logger.error(e);
        }
        driverField.setText(getString(DB_DRIVER));
        urlField.setText(getString(DB_URL));
        userField.setText(getString(DB_USER));
        pwdField.setText(getString(DB_PWD));
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)
    {
        java.awt.EventQueue.invokeLater(new Runnable()
        {

            public void run()
            {
                DBTestDialog dialog = new DBTestDialog(new javax.swing.JFrame(), true);
                dialog.addWindowListener(new java.awt.event.WindowAdapter()
                {

                    public void windowClosing(java.awt.event.WindowEvent e)
                    {
                        System.exit(0);
                    }
                });
                dialog.setVisible(true);
            }
        });
    }
}
