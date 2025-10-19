import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Link,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import metaxelImage from "../assets/images/metaxel.png"; // Import the local image
import mancozebImage from "../assets/images/Mancozeb.png";
import RidomilGoldImage from "../assets/images/Ridomil Gold.png";
import ChlorothalonilImage from "../assets/images/Chlorothalonil.png";
import Mancozeb1Image from "../assets/images/Mancozeb1.png";
import CopperFungicidesImage from "../assets/images/CopperFungicides.png";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
    backgroundSize: 'contain',
  },
  productText: {
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  linkText: {
    textAlign: "center",
    marginTop: theme.spacing(0.5),
  },
  cardContainer: {
    marginBottom: theme.spacing(3),
  },
  gridContainer: {
    marginTop: theme.spacing(2),
  }
}));

const solutions = {
  "early-blight": {
    description: "Dark brown spots develop on the leaves starting at the tip or the leaf margins. In humid climates, these spots become water-soaked lesions. A white fungal covering can be seen on the underside of the leaves. As the disease progresses, entire leaves become necrotic, turn brown and die off. Similar lesions develop on stems and petioles. The potato tubers have greyish-blue spots on their skin and their flesh also turns brown, making them inedible. The rotting of the infested fields emits a distinctive odor.",
    symptoms: [
      "Dark brown spots on leaf tips and margins.",
      "Spots turn into transparent wounds.",
      "White fungus covers the underside of leaves.",
      "Leaves wilt and die off.",
      "Grayish-blue spots on potato tubers.",
    ],
    solution: "Use fungicides like Chlorothalonil, Mancozeb, or Copper Fungicides.",
    agrochemicals: [
      {
        name: "Chlorothalonil",
        link: "https://krishisevakendra.in/products/katyayani-dr-blight-metalaxyl-m-3-3-chlorothalonil-33-1-sc-fungicide?_pos=1&_sid=e9ed012f7&_ss=r",
        image: ChlorothalonilImage, // Replace with real image URL
      },
      {
        name: "Mancozeb",
        link: "https://krishisevakendra.in/products/k-zeb-mancozeb-75-wp-fungicide?_pos=1&_sid=18f112a34&_ss=r",
        image: Mancozeb1Image,
      },
      {
        name: "Copper Fungicides",
        link: "https://krishisevakendra.in/products/copper-sulphate-fungicide?_pos=1&_sid=c1f15b421&_ss=r",
        image: CopperFungicidesImage,
      },
    ],
  },
  "late-blight": {
    description: "Similar to early blight but affects the plant at all stages, causing dark, water-soaked lesions and a white fungal growth on leaves, stems, and tubers.",
    symptoms: [
      "Dark, water-soaked lesions on leaves and stems.",
      "White fungal growth on the underside of leaves.",
      "Tubers develop brown spots and rot.",
    ],
    solution: "Use fungicides like Metalaxyl, Mancozeb, or Ridomil Gold.",
    agrochemicals: [
      {
        name: "Metalaxyl",
        link: "https://krishisevakendra.in/products/metalaxyl-35-ws-metaxel-fungicide?variant=47262396055848&country=IN&currency=INR&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&utm_source=Google&utm_medium=Pmax&utm_campaign=Pmax+South+State+English&utm_term=utm_term&gad_source=1&gclid=Cj0KCQiAst67BhCEARIsAKKdWOlF1lPSkqihXF2-Ee_O00kwSDKx8eICU1NnhZ92w4lbrjgE4bvrzScaAkuJEALw_wcB",
        image: metaxelImage, // Use the imported image
      },
      {
        name: "Mancozeb",
        link: "https://krishisevakendra.in/products/katyayani-chatur-mancozeb-40-azoxystrobin-7-os-fungicide?_pos=1&_psq=Mancozeb+fu&_ss=e&_v=1.0",
        image: mancozebImage,
      },
      {
        name: "Ridomil Gold",
        link: "https://krishisevakendra.in/products/metalaxyl-8-mancozeb-64-wp-meta-manco-fungicide?_pos=1&_sid=ebd884c4f&_ss=r",
        image: RidomilGoldImage,
      },
    ],
  },
  "healthy": {
    description: "No disease detected. The potato leaf is healthy and no action is required.",
    symptoms: [],
    solution: "No action required. The potato leaf is healthy.",
    agrochemicals: [],
  },
};

const SolutionPage = () => {
  const { disease } = useParams();
  const classes = useStyles();
  const solution = solutions[disease] || { description: "No description available", symptoms: [], solution: "No solution available", agrochemicals: [] };

  return (
    <Container>
      <Card className={classes.cardContainer}>
        <CardContent>
          <Typography variant="h5">Diagnosis Result: {disease.replace("-", " ")}</Typography>
          <Typography variant="h6" gutterBottom>Description:</Typography>
          <Typography gutterBottom>{solution.description}</Typography>
          <Typography variant="h6" gutterBottom>Symptoms:</Typography>
          {solution.symptoms.length > 0 ? (
            <ul>
              {solution.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          ) : (
            <Typography>No symptoms listed.</Typography>
          )}
          <Typography variant="h6" gutterBottom>Solution:</Typography>
          <Typography gutterBottom>{solution.solution}</Typography>
        </CardContent>
      </Card>
      <Typography variant="h6" gutterBottom>Recommended Products:</Typography>
      <Grid container spacing={3} className={classes.gridContainer}>
        {solution.agrochemicals.length > 0 && (
          solution.agrochemicals.map((chemical, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  className={classes.media}
                  image={chemical.image}
                  title={chemical.name}
                />
                <CardContent>
                  <Typography className={classes.productText}>{chemical.name}</Typography>
                  <Link href={chemical.link} target="_blank" rel="noopener noreferrer" className={classes.linkText}>
                    Learn more
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default SolutionPage;