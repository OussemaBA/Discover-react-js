import React from "react";
import { Grid, Image } from "semantic-ui-react";

const ProfileLayout = () => (
  <Grid celled="internally">
    <Grid.Row>
      <Grid.Column>
        <Grid columns="three" divided>
          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Grid columns="three" divided>
          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
            <Grid.Column>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>{" "}
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default ProfileLayout;
