import React, { Component } from 'react';
import { Form, Input, Select, Checkbox, DatePicker, Button } from 'antd';
import Utils from '../../utils';
const FormItem = Form.Item;

class FilterForm extends Component {
    formRef = React.createRef();
    initFormList = () => {
        const { formList } = this.props;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                const { type, label, field, placeholder, width } = item;
                if (type === '时间查询') {
                    const startTime = <FormItem label="订单时间" name="start_time">
                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(startTime);
                    const endTime = <FormItem label="~" colon={false} name="end_time">
                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(endTime);
                } else if (type === 'INPUT') {
                    const INPUT = <FormItem label={label} name={field}>
                        <Input type="text" placeholder={placeholder} />
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (type === 'SELECT') {
                    const SELECT = <FormItem label={label} name={field}>
                        <Select
                            style={{width: width}}
                            placeholder={placeholder}
                        >
                            {Utils.getOptionList(item.list)}
                        </Select>
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (type === 'CHECKBOX') {
                    const CHECKBOX = <FormItem name={field}>
                        <Checkbox>{label}</Checkbox>
                    </FormItem>;
                    formItemList.push(CHECKBOX);
                } else if (type === 'DATE') {
                    const DATE = <FormItem label={label} name={field}>
                        <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss" />
                    </FormItem>;
                    formItemList.push(DATE);
                }
            });
        }
        return formItemList;
    };

    handleFilterSubmit = () => {
        const fieldsValue = this.formRef.current.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    };

    reset = () => {
        this.formRef.current.resetFields();
    };

    render() {
        const { initialValues } = this.props;
        return (
            <Form
                ref={this.formRef}
                layout="inline"
                initialValues={initialValues}
            >
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin: '0 20px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

export default FilterForm;
