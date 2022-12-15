import React, {useState} from 'react';
import './App.css';
import { ConfigProvider, Button, Switch, Space, Row, Col, Alert } from 'antd';
import {ColorResult, SketchPicker} from 'react-color';
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
} from 'darkreader';
import {Theme} from "antd/lib/config-provider/context";

const colorKeys: (keyof Theme)[] = ['primaryColor', 'infoColor', "errorColor", "processingColor", "successColor", "warningColor"];

function App() {
  const [color, setColor] = useState<Theme>({
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
  });

  const onChangeComplete = (colorType: keyof Theme, changedColor: ColorResult ) => {
    console.log(colorType, changedColor)
    const mergedColor = {
      ...color,
      [colorType]: changedColor.hex,
    };
    setColor(mergedColor);
    ConfigProvider.config({
      theme: mergedColor,
    });
  };

  return (
    <ConfigProvider>
      <div style={{padding: 24}} title="Test theme change">
        <Row gutter={[24, 24]}>
          {colorKeys.map(item => (
            <Col>
              {item}：<SketchPicker color={color[item]} onChangeComplete={(res) => onChangeComplete(item, res)} styles={{default: {
                picker: {
                  width: 250
                }
              }}} />
            </Col>
          ))}
        </Row>


        <Space style={{marginTop: 24}}>
          <Button type="primary">button</Button>
          <Button type="primary" danger>button</Button>
          <Button>button</Button>
          <Alert showIcon message="Success Text" type="success" />
          <Alert showIcon message="Info Text" type="info" />
          <Alert showIcon message="Warning Text" type="warning" />
          <Alert showIcon message="Error Text" type="error" />
          <Switch checkedChildren="dark" unCheckedChildren="light" onChange={(e) => {
            !e ? disableDarkMode() : enableDarkMode({
              brightness: 100,
              contrast: 100,
              sepia: 0,
            });
          }} />
        </Space>
      </div>
    </ConfigProvider>
  );
}

export default App;
