import { CalendarOutlined, InfoCircleOutlined, LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Steps, Tooltip } from 'antd';
import LoginStep from './Steps/Login';

const StepperContainer = () => {

  

  return(

    <Col span={12} offset={6}>

        <Steps
          items={[
            {
              title: 'Login',
              status: 'finish',
              icon: <UserOutlined />,
            },
            {
              title: 'Serviços',
              status: 'finish',
              icon: <SolutionOutlined />,
            },
            {
              title: 'Horários',
              status: 'process',
              icon: <LoadingOutlined />,
            },
            {
              title: 'Confirmação',
              status: 'wait',
              icon: <SmileOutlined />,
            },
            {
              title: 'Concluído',
              status: 'wait',
              icon: <SmileOutlined />,
            },
          ]}
        />

      <br />
      <br />

      <Row>
        <LoginStep/>
      </Row>
      
    </Col>


)}

export default StepperContainer;