// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { changePage } from 'intro/flux/actions/book';
import dispatcher from 'intro/flux/dispatcher';
import BookStore from 'intro/flux/stores/Book';

export default class Book extends Component {
    state = BookStore.getState();

    componentDidMount () {
        BookStore.subscribe(this._onChange);
    }

    componentWillUnmount () {
        BookStore.unsubscribe(this._onChange);
    }

    _onChange = () => {
        this.setState(() => ({
            currentPage: BookStore.getCurrentPage(),
        }));
    };

    _changePage = (event) => {
        dispatcher.dispatch(changePage(event.target.value));
    };

    render () {
        const { currentPage, totalPages, title } = this.state;

        const pagesToSelect = [...Array(totalPages).keys()].map((page) => (
            <option key = { page }>{page}</option>
        ));

        return (
            <section className = { Styles.book }>
                <h1>{title}</h1>
                <div>
                    Go to
                    <select value = { currentPage } onChange = { this._changePage }>
                        {pagesToSelect}
                    </select>
                    page
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce tristique, dui quis malesuada finibus, libero orci
                    vehicula sem, at pharetra nibh felis id ex. Sed finibus
                    mauris urna, tempus tincidunt tellus ullamcorper eget. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                    pharetra porta mi non eleifend. In convallis, lectus quis
                    faucibus rhoncus, urna augue hendrerit ex, non finibus elit
                    nulla quis nisl. Praesent lobortis tortor a elit imperdiet
                    bibendum. Pellentesque ipsum lacus, laoreet vel efficitur
                    dapibus, euismod et dolor. Phasellus sem nulla, auctor et
                    fermentum id, dignissim nec arcu. Curabitur tincidunt, nibh
                    sed lobortis consectetur, eros metus feugiat ante, a
                    fringilla turpis lorem at nibh. Morbi luctus fringilla enim
                    non efficitur. Nullam id fermentum felis. Sed id sodales
                    leo. Maecenas sodales orci quis dolor condimentum, vitae
                    efficitur nulla sodales. Duis vitae ipsum nisl. Donec vitae
                    risus euismod, pellentesque neque eu, mollis ipsum. Morbi in
                    nunc vel metus consectetur vehicula sed sit amet orci.{' '}
                </p>
                <p>
                    Curabitur ac lacus et est tincidunt imperdiet. Sed vehicula
                    bibendum magna non rhoncus. Nunc hendrerit, lectus vel
                    finibus hendrerit, ipsum libero auctor nulla, eget semper
                    sem justo quis lorem. Vestibulum varius congue orci, non
                    lobortis leo mattis quis. In porta neque ante. Vivamus
                    congue lorem massa, sit amet tincidunt mauris viverra non.
                    Aliquam et fermentum libero. Integer sollicitudin ante nec
                    metus accumsan dictum. Cras viverra sollicitudin sapien, in
                    elementum massa tempor nec. Vivamus a eros ligula. Vivamus
                    quis libero quis massa auctor ornare. Praesent ut ex nec
                    tellus suscipit hendrerit non sit amet tortor. Suspendisse
                    viverra consectetur porttitor. Cras vel diam placerat ipsum
                    tristique ultricies. Fusce nec convallis dolor. Fusce in
                    interdum sapien.
                </p>
                <p>
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Duis iaculis dui nec blandit
                    euismod. Etiam efficitur finibus enim ut aliquet. Phasellus
                    eget eros ac mauris tristique porta in eget justo. In in
                    urna dapibus ipsum fringilla congue at vitae eros. Praesent
                    tincidunt convallis dui sed finibus. Aliquam dapibus leo eu
                    neque dictum, vel mattis nisl malesuada. Aenean auctor
                    finibus diam, nec vulputate est elementum ac. Suspendisse
                    quis ornare metus, nec consequat sem. Cras porta augue et
                    diam pretium, a cursus sem bibendum.
                </p>
                <p>
                    Interdum et malesuada fames ac ante ipsum primis in
                    faucibus. Morbi et rhoncus magna. Vivamus et congue nibh.
                    Integer massa nisi, fermentum ac enim sit amet, venenatis
                    consequat odio. Pellentesque interdum magna pretium,
                    consequat dui in, rhoncus tellus. Nunc posuere massa quis
                    nisi pharetra sollicitudin. Mauris consequat consectetur
                    lectus, vitae semper erat lacinia ut. Quisque consequat
                    placerat odio eu lacinia. Integer id dolor ante. Vivamus vel
                    viverra lacus, quis porta est. Nulla sed dapibus odio, at
                    auctor odio.
                </p>
                <p>
                    Sed viverra tellus ut dui imperdiet facilisis. Donec
                    condimentum mollis tortor, at tristique justo vulputate nec.
                    Pellentesque pulvinar, massa et rutrum congue, dolor urna
                    semper libero, id tempor tellus dui sed ante. Aliquam erat
                    volutpat. Nam fringilla ante sed mauris sollicitudin, ut
                    tempor lectus dignissim. Vestibulum eu semper felis, nec
                    tristique ligula. Proin sapien urna, vestibulum vitae
                    vulputate at, fringilla et lacus. Sed ut semper nunc, nec
                    maximus leo. Nam eleifend, libero eu tincidunt suscipit,
                    erat lacus imperdiet lorem, et consequat dui ipsum nec
                    neque.
                </p>
                <footer>Total pages: {totalPages}</footer>
            </section>
        );
    }
}
