import React from 'react'

export default class Jsx extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTitle: true,
            goods: [
                { text: 'Vue', id: 1 },
                { text: 'React', id: 2 },
                { text: 'Angular', id: 3 }
            ],
            count: 0
        }
    }
    // 事件绑定this指向：
    // 1.在constructor里手动bind this.handleClick = this.handleClick.bind(this)
    // 2.在绑定的时候传递箭头函数 <button onClick={() => this.handleClick(i)}>Add To Cart</button>
    // 3.定义的时候是箭头函数 handleClick = () => { ... }
    // 4.onClick的时候直接绑定
    handleClick(i) {
        console.log(i);
    }

    render() {
        return (
            <div>
                { this.state.showTitle && <h2>{this.props.title}</h2> }
                <ul>
                    {
                        this.state.goods.map((item, i) => {
                            return (
                                <li key={item.id}>
                                    <span>{item.text}</span>
                                    <button onClick={() => this.handleClick(i)}>Add To Cart</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
