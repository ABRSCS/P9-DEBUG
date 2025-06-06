import { useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import Select from "../../components/Select/Select";
import { useData } from "../../contexts/DataContext/DataContext";
import Modal from "../Modal/Modal";
import ModalEvent from "../ModalEvent/ModalEvent";

import "./Events.css";

const PER_PAGE = 9;

const EventList = () => {
    const { data, error } = useData();
    const [type, setType] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');

    const toggleSortOrder = () => {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const filteredEvents = data?.events
      ?.filter((event) => type ? event.type === type : true) // Filtre les événements par type
      ?.sort((evtA, evtB) => {
        const dateA = new Date(evtA.date);
        const dateB = new Date(evtB.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      }) || [];

    const paginatedEvents = filteredEvents.filter((event, index) => (
        (currentPage - 1) * PER_PAGE <= index &&
        PER_PAGE * currentPage > index
      ));

    const changeType = (evtType) => {
      setCurrentPage(1);
      setType(evtType);
    };

    const pageNumber =
      Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;

    const typeList = new Set(data?.events?.map((event) => event.type));

    return (
      <>
        {error && <div>An error occured</div>}
        {data === null ? (
          "loading"
        ) : (
          <>
            <h3 className="SelectTitle">Catégories</h3>
            <Select
              selection={Array.from(typeList)}
              onChange={(value) =>
                value ? changeType(value) : changeType(null)
              }
            />
            {/* Ajout d'un bouton pour changer l'ordre de tri */}
            <button type="button" onClick={toggleSortOrder}>
              Trier par date ({sortOrder === 'asc' ? 'Croissant' : 'Décroissant' })
            </button>
            <div id="events" className="ListContainer">
              {paginatedEvents.map((event) => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover}
                      title={event.title}
                      date={new Date(event.date)}
                      label={event.type}
                    />
                  )}
                </Modal>
              ))}
            </div>
            <div className="Pagination">
              {[...Array(pageNumber || 0)].map((_, n) => (
                <a
                  key={`page-${n + 1}`}
                  href="#events"
                  onClick={() => setCurrentPage(n + 1)}
                  className={currentPage === n + 1 ? "active" : ""}
                >
                  {n + 1}
                </a>
              ))}
            </div>
          </>
        )}
      </>
    );
  };

  export default EventList;
