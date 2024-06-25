import React, { useState } from "react";
import {
  AreaChartOutlined,
  CalendarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import Logo from "./assets/logo.svg";
import styles from "./App.module.css";
import Dashboard from "./components/dashboard";
import Customers from "./components/customers";
import Scheduler from "./components/schedulers";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState<any>({
    key: "1",
    title: "Dashboard",
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={collapsed ? styles.withoutLogo : styles.logoContainer}>
          <img src={Logo} alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={(e) => setSelectedTab(e)}
          items={[
            {
              key: "1",
              icon: <AreaChartOutlined />,

              label: "Dashboard",
              title: "Dashboard",
            },
            {
              key: "2",
              icon: <TeamOutlined />,
              label: "Clientes",
              title: "Clientes",
            },
            {
              key: "3",
              icon: <CalendarOutlined />,
              label: "Agenda",
              title: "Agenda",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <div style={{ padding: "1rem 0px 0px 1rem" }}>
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: <a>{selectedTab?.item?.props?.title}</a>,
              },
            ]}
          />
        </div>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {selectedTab?.key === "1" && <Dashboard />}
          {selectedTab?.key === "2" && <Customers />}
          {selectedTab?.key === "3" && <Scheduler />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
