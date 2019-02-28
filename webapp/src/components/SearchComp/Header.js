import React from 'react'
import { Button, Icon, Input, Dropdown, Menu, Switch } from 'antd'

export default function({
  shuffle,
  search,
  setColumns,
  setMargin,
  setHeight,
  columns,
  margin
}) {
  return (
    <div className="header">
      <Button type="primary" onClick={shuffle}>
        Shuffle
      </Button>
      <Input
        style={{ marginLeft: 15, minWidth: 130, maxWidth: 300 }}
        suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
        placeholder="input search text"
        onChange={search}
      />
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu onClick={setColumns}>
            <Menu.Item key="1">1</Menu.Item>
            <Menu.Item key="2">2</Menu.Item>
            <Menu.Item key="3">3</Menu.Item>
            <Menu.Item key="4">4</Menu.Item>
            <Menu.Item key="5">5</Menu.Item>
            <Menu.Item key="6">6</Menu.Item>
          </Menu>
        }>
        <Button style={{ marginLeft: 15, minWidth: 130 }}>
          {columns} Columns <Icon type="down" />
        </Button>
      </Dropdown>
      <Dropdown
        trigger={['click']}
        overlay={
          <Menu onClick={setMargin}>
            <Menu.Item key="0">0</Menu.Item>
            <Menu.Item key="20">20</Menu.Item>
            <Menu.Item key="40">40</Menu.Item>
            <Menu.Item key="70">70</Menu.Item>
          </Menu>
        }>
        <Button style={{ marginLeft: 15, minWidth: 130 }}>
          {margin} px margin <Icon type="down" />
        </Button>
      </Dropdown>
      <span style={{ marginLeft: 15 }}>Individual height</span>
      <Switch style={{ marginLeft: 15 }} defaultChecked onChange={setHeight} />
    </div>
  )
}
