import { useEffect, useState } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import parse from 'html-react-parser';
import './cardComponent.css'


const CardComponent = () => {
    const [cardHtml, setCardHtml] = useState([])

    useEffect(() => {
        axios.get("https://www.reddit.com/r/reactjs.json")
            .then(res => {
                const filteredData = res.data.data.children.filter(
                    (item) => item.data.selftext_html !== null
                );
                setCardHtml(filteredData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const modifyHtml = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    return (
        <Row xs={1} md={2} className="g-4 m-5">
            {cardHtml?.map((item, idx) => (
                <Col key={idx} >
                    <Card className="hover-card" >
                        <Card.Body className="hover-scroll" >
                            <Card.Title>{item.data.title}</Card.Title>
                            <Card.Text >
                                {item.data.selftext_html ? parse(modifyHtml(item.data.selftext_html)) : ""}
                            </Card.Text>
                            <Card.Link href={item.data.url}>{item.data.url}</Card.Link>
                        </Card.Body>
                        <Card.Footer className='card-footer'>
                            <small className="text-muted">Score updated is {item.data.score}</small>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default CardComponent


