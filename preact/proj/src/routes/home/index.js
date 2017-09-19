import { h, Component } from 'preact';

import Container from '../../components/container';
import Row from '../../components/row';
import Card from '../../components/card';
import Item from '../../components/item';

import style from './style';

export default class Home extends Component {
    render() {
        return (
            <Container>
                <div class={style.Home}>
                    <h1 class={style.Home__title}>Home</h1>
                    <Card title="Check out the new items on our store">
                        <Row>
                            <Item
                                imageUrl="http://g-ecx.images-amazon.com/images/G/31//img16/PC/sep/LaptopsRevamp/budget._V279288877_.jpg"
                                title="Laptop"
                                description="Lenovo G50-80 15.6-inch Laptop (Core i3-5005U/8GB/1TB/Windows 10 Home/2GB Graphics), Black"
                                rating={1}
                            />
                            <Item
                                imageUrl="./assets/images/laptop3.jpeg"
                                title="Laptop"
                                description="14.1 HD Laptop Computer Intel x5-Z8350 64-bit Quad core Windows 10 with 2GB RAM 64GB SSD USB 3.0, WIFI, Bluetooth Laptop Computer"
                                rating={3}
                            />
                            <Item
                                imageUrl="./assets/images/laptop2.jpeg"
                                title="Laptop"
                                description="Macbook Pro silver"
                                rating={4}
                            />
                            <Item
                                imageUrl="./assets/images/laptop1.jpg"
                                title="Laptop"
                                description="HP Stream 14-ax003ns - 14'' HD (Intel Celeron N3060, 4 GB RAM, 32 GB eMMC, Intel HD Graphics 400"
                                rating={5}
                            />
                        </Row>
                    </Card>
                </div>
            </Container>
        );
    }
}
