import React, { Component } from 'react';
import { Card, Modal, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';

class RichText extends Component {
    state = {
        showRichText:false,
        editorContent: '',
        editorState: ''
    };

    handleClearContent = () => {
        this.setState({
            editorState:''
        });
    };

    handleGetText = () => {
        this.setState({
            showRichText:true
        });
    };

    onEditorChange = editorContent => {
        this.setState({
            editorContent,
        });
    };

    onEditorStateChange = editorState => {
        this.setState({
            editorState
        });
    };

    render() {
        const { editorContent, editorState } = this.state;
        return (
            <div style={{width: '100%'}}>
                <Card style={{marginTop: 10}}>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    onCancel={()=>{
                        this.setState({
                            showRichText:false
                        })
                    }}
                    footer={null}
                >
                    {draftjs(editorContent)}
                </Modal>
            </div>
        );
    }
}

export default RichText;