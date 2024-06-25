import { Button, Col, Form, Input, Row, Select } from "antd";
import moment from "moment";
import { useEffect } from "react";
import InputMask from "../input-mask";

interface Props {
  onSubmitForm: (values: any) => void;
  onCancel: () => void;
  initialValues: { startTime: Date; endTime: Date };
}

const serviceOptions = [
  { label: "Corte Social", value: "1" },
  { label: "Corte Degradê", value: "2" },
  { label: "Escova Progressiva", value: "3" },
  { label: "Barba", value: "4" },
  { label: "Sobrancelha", value: "5" },
];

const customerOptions = [
  { label: "João Gabriel da Silva", value: "1" },
  { label: "Felipe Martins Roque", value: "2" },
  { label: "Maurício Santos", value: "3" },
  { label: "Letícia Ferreira", value: "4" },
];

export default function CalendarForm({
  onSubmitForm,
  onCancel,
  initialValues,
}: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      startTime: moment(initialValues.startTime).format("HH:mm"),
      endTime: moment(initialValues.endTime).format("HH:mm"),
    });
  }, [initialValues, form]);

  return (
    <Form
      onFinish={(values) => onSubmitForm(values)}
      layout="vertical"
      form={form}
      initialValues={{
        startTime: moment(initialValues.startTime).format("HH:mm"),
        endTime: moment(initialValues.endTime).format("HH:mm"),
      }}
    >
      <Form.Item name={"title"} label="Título do agendamento">
        <Input placeholder="Ex. Corte simples" allowClear />
      </Form.Item>
      <Form.Item name={"customer"} label="Cliente">
        <Select
          allowClear
          placeholder="Selecionar cliente"
          options={customerOptions}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          showSearch
        />
      </Form.Item>
      <Form.Item name={"services"} label="Serviço">
        <Select
          mode="multiple"
          allowClear
          placeholder="Selecionar o(s) serviço(s)"
          options={serviceOptions}
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name={"startTime"}
            rules={[{ required: true, message: "Preencha a hora de início!" }]}
            label="Hora de início"
          >
            <InputMask mask="99:99" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={"endTime"}
            rules={[{ required: true, message: "Preencha a estimativa!" }]}
            label="Previsão de término"
          >
            <InputMask mask="99:99" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12} justify={"end"}>
        <Col>
          <Form.Item>
            <Button type="text" onClick={onCancel}>
              Cancelar
            </Button>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
