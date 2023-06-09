// import React from 'react';
import { Col, Image, Layout, Row, Typography } from 'antd';
import type { BadgeProps } from 'antd';
import { Badge, Calendar } from 'antd';
import Logo from '../../assets/girl-calendar.png'
import type { Dayjs } from 'dayjs';
import type { CellRenderInfo } from 'rc-picker/lib/interface';
import './index.css'

const getListData = (value: Dayjs) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
            ];
            break;
        case 10:
            listData = [
                { type: 'warning', content: 'This is warning event.' },
                { type: 'success', content: 'This is usual event.' },
                { type: 'error', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'warning', content: 'This is warning event' },
                { type: 'success', content: 'This is very long usual event。。....' },
                { type: 'error', content: 'This is error event 1.' },
                { type: 'error', content: 'This is error event 2.' },
                { type: 'error', content: 'This is error event 3.' },
                { type: 'error', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
        return 1394;
    }
};

export function Schedule() {
    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    return (
        <Layout className='calendar-layout-aling'>
            <Row align="middle" style={{minHeight: '10%'}}>
                <Col span={8}>
                    <Image
                        src={Logo}
                    />
                </Col>
                <Col span={8}>
                    <Typography.Title
                        level={1}
                        style={{
                            margin: 0,
                            color: 'var(--color-text)',
                            textAlign: 'center',
                        }}
                    >
                        Agenda Dinâmica
                    </Typography.Title>
                </Col>
                <Col span={8}>
                </Col>
            </Row>
            <Row align="middle">
                <Col span={24}>
                    <Calendar
                        cellRender={cellRender}
                        style={{ maxWidth: '90%', margin: '0 auto'}}
                    /> 
                </Col>
            </Row>
        </Layout>
    )
}