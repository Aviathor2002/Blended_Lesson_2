import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    isEmpty: false,
    isVisible: false,
    error: null,
  };

  handleSubmit = value => {
    console.log(value);
    this.setState({
      query: value,
      images: [],
      page: 1,
      isEmpty: false,
      error: null,
    });
  };

  getPhotos = async () => {
    this.setState({ isLoading: true });

    try {
      const {
        photos,
        page: currentPage,
        per_page,
        total_results,
      } = await ImageService.getImages(this.state.query, this.state.page);

      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isVisible: currentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getPhotos();
    }
  }

  render() {
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {this.state.images.length > 0 &&
            this.state.images.map(({ id, avg_color, alt, src }) => (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            ))}
        </Grid>
        {this.state.isVisible && (
          <Button disabled={this.state.isLoading} onClick={this.onLoadMore}>
            {this.state.isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}

        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
