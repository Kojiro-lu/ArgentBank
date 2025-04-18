import features from "../../Data/features.json";
import Feature from "../../components/Feature/Feature";
import "./FeaturesSection.scss";

const FeaturesSection = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {features.map(({ id, icon, title, description }) => (
        <Feature key={id} icon={icon} title={title} description={description} />
      ))}
    </section>
  );
};

export default FeaturesSection;
