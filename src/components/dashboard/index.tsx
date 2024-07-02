import { Col, Row } from "antd";

export default function Dashboard() {
  return (
    <div>
      <div />
      <Row gutter={12} style={{ marginBottom: "12px" }}>
        <Col span={8}>
          <div style={{ background: "orange", height: "200px" }}>Receitas</div>
        </Col>
        <Col span={8}>
          <div style={{ background: "green", height: "200px" }}>Despesas</div>
        </Col>
        <Col span={8}>
          <div style={{ background: "red", height: "200px" }}>Resultado</div>
        </Col>
      </Row>
      <Row gutter={12} style={{ marginBottom: "12px", marginTop: "12px" }}>
        <Col span={8}>
          <div style={{ background: "orange", height: "200px" }}>
            Receitas x Serviços
          </div>
        </Col>
        <Col span={8}>
          <div style={{ background: "green", height: "200px" }}>
            Receitas x Produtos
          </div>
        </Col>
        <Col span={8}>
          <div style={{ background: "red", height: "200px" }}>
            Serviços x Produtos %
          </div>
        </Col>
      </Row>
      <Row style={{ background: "red", marginBottom: "12px" }}>
        <Col span={24} style={{ background: "blue", height: "200px" }}>
          <div> customer counter and customer birthday</div>
        </Col>
      </Row>
      <Row style={{ background: "red", marginBottom: "12px" }}>
        <Col span={24} style={{ background: "blue", height: "200px" }}>
          products notification
          <div> products notification</div>
        </Col>
      </Row>
    </div>
  );
}
