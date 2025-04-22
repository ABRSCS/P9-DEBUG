import Menu from "../../containers/Menu/Menu";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import EventCard from "../../components/EventCard/EventCard";
import PeopleCard from "../../components/PeopleCard/PeopleCard";

import "./Home.scss";
import EventList from "../../containers/Events/Events";
import Slider from "../../containers/Slider/Slider";
import Logo from "../../components/Logo/Logo";
import Icon from "../../components/Icon/Icon";
import Form from "../../containers/Form/Form";
import Modal from "../../containers/Modal/Modal";
import { useData } from "../../contexts/DataContext/DataContext";

const Page = () => {
  const { data } = useData();
  const last = data?.events
    ? [...data.events].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
    : null;

  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <section className="SliderContainer">
          <Slider />
        </section>
        <section id="nos-services" className="ServicesContainer">
          <h2 className="Title">Nos services</h2>
          <p>Nous organisons des événements sur mesure partout dans le monde</p>
          <div className="ListContainer">
            <ServiceCard imageSrc="/images/priscilla-du-preez.png">
              <h3>Soirée d&apos;entreprise</h3>
              Une soirée d&apos;entreprise vous permet de réunir vos équipes pour un
              moment convivial afin de valoriser votre société en projetant une
              image dynamique. Nous vous proposons d&apos;organiser pour vous vos
              diners et soirée d&apos;entreprise
            </ServiceCard>
            <ServiceCard imageSrc="/images/hall-expo.png">
              <h3>Conférences</h3>
              724 events vous propose d&apos;organiser votre évènement, quelle que soit
              sa taille, en s&apos;adaptant à votre demande et à vos demandes. En tant
              que spécialistes de l&apos;évènementiel, nous saurons trouver le lieu
              parfait ainsi que des solutions inédites pour capter votre audience
              et faire de cet évènement un succès
            </ServiceCard>
            <ServiceCard imageSrc="/images/sophia-sideri.png">
              <h3>Experience digitale</h3>
              Notre agence experte en contenus immersifs offre des services de
              conseil aux entreprises, pour l&apos;utilisation de la réalité virtuelle,
              de la réalité augmentée et de la réalité mixte de l&apos;animation
              événementielle, à la veille technologique jusqu&apos;au développement de
              module de formation innovant
            </ServiceCard>
          </div>
        </section>
        <section id="nos-realisations" className="EventsContainer">
          <h2 className="Title">Nos réalisations</h2>
          <EventList />
        </section>
        <section id="notre-equipe" className="PeoplesContainer">
          <h2 className="Title">Notre équipe</h2>
          <p>Une équipe d&apos;experts dédiés à l&apos;ogranisation de vos événements</p>
          <div className="ListContainer">
            <PeopleCard
              imageSrc="/images/stephanie-liverani.png"
              name="Samira"
              position="CEO"
            />
            <PeopleCard
              imageSrc="/images/linkedin-sales-solutions.png"
              name="Jean-baptiste"
              position="Directeur marketing"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-S.png"
              name="Alice"
              position="CXO"
            />
            <PeopleCard
              imageSrc="/images/jonas-kakaroto.png"
              name="Luís"
              position="Animateur"
            />
            <PeopleCard
              imageSrc="/images/amy-hirschi.png"
              name="Christine"
              position="VP animation"
            />
            <PeopleCard
              imageSrc="/images/christina-wocintechchat-com-0.png"
              name="Isabelle"
              position="VP communication"
            />
          </div>
        </section>
        <div className="FormContainer" id="contact">
          <h2 className="Title">Contact</h2>
          <Modal
            Content={
              <div className="ModalMessage--success">
                <div>Message envoyé !</div>
                <p>
                  Merci pour votre message nous tâcherons de vous répondre dans
                  les plus brefs délais
                </p>
              </div>
            }
          >
            {({ setIsOpened }) => (
              <Form
                onSuccess={() => setIsOpened(true)}
                onError={() => null}
              />
            )}
          </Modal>
        </div>
      </main>
      <footer className="row">
        <div className="col presta">
          <h3>Notre dernière prestation</h3>
          {last && last.cover && last.title && last.date && (
            <EventCard
              imageSrc={last.cover}
              title={last.title}
              date={new Date(last.date)}
              small
              label="boom"
            />
          )}
        </div>
        <div className="col contact">
          <h3>Contactez-nous</h3>
          <address>45 avenue de la République, 75000 Paris</address>
          <div>01 23 45 67 89</div>
          <div>contact@724events.com</div>
          <div>
            <a href="#twitch">
              <Icon name="twitch" />
            </a>
            <a href="#facebook">
              <Icon name="facebook" />
            </a>
            <a href="#twitter">
              <Icon name="twitter" />
            </a>
            <a href="#youtube">
              <Icon name="youtube" />
            </a>
          </div>
        </div>
        <div className="col description">
          <Logo size="large" />
          <p>
            Une agence événementielle propose des prestations de service
            spécialisées dans la conception et l&apos;organisation de divers événements
            tels que des événements festifs, des manifestations sportives et
            culturelles, des événements professionnels
          </p>
        </div>
      </footer>
    </>
  );
};

export default Page;
