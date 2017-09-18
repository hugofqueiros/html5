import {h, Component} from 'preact';
import Container from '../../components/container';
import Row from '../../components/row';
import Card from '../../components/card';
import Item from '../../components/item';
import style from './style';

export default class Other extends Component {
    render() {
        return (
            <Container>
                <div class={style.Other}>
                    <h1 class={style.Other__title}>Other</h1>
                    <Card title="Other awesome laptops!">
                        <Row>
                            <Item
                                imageUrl="./assets/images/laptop1.jpg"
                                title="Laptop"
                                description="Lenovo G50-80 15.6-inch Laptop (Core i3-5005U/8GB/1TB/Windows 10 Home/2GB Graphics), Black"
                                rating={4}
                            />
                            <Item
                                imageUrl="http://g-ecx.images-amazon.com/images/G/31//img16/PC/sep/LaptopsRevamp/budget._V279288877_.jpg"
                                title="Laptop"
                                description="Lenovo G50-80 15.6-inch Laptop (Core i3-5005U/8GB/1TB/Windows 10 Home/2GB Graphics), Black"
                                rating={4}
                            />
                            <Item
                                imageUrl="http://g-ecx.images-amazon.com/images/G/31//img16/PC/sep/LaptopsRevamp/budget._V279288877_.jpg"
                                title="Laptop"
                                description="Lenovo G50-80 15.6-inch Laptop (Core i3-5005U/8GB/1TB/Windows 10 Home/2GB Graphics), Black"
                                rating={4}
                            />
                            <Item
                                imageUrl="http://g-ecx.images-amazon.com/images/G/31//img16/PC/sep/LaptopsRevamp/budget._V279288877_.jpg"
                                title="Laptop"
                                description="Lenovo G50-80 15.6-inch Laptop (Core i3-5005U/8GB/1TB/Windows 10 Home/2GB Graphics), Black"
                                rating={4}
                            />
                        </Row>
                    </Card>
                </div>
            </Container>
        );
    }
}
