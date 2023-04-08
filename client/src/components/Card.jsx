const Card = (props) => {

  return (
    <div className="card">
      <img
        src={"http://openweathermap.org/img/wn/" + props.icon + "@4x.png"}
        alt={props.description}
      />
      <div className="container">
        <h3>{props.city}</h3>
        <p>{props.description}</p>
        <p>High {props.tempMax}&deg;F  |  Low {props.tempMin}&deg;F</p>
        <p>Feels like: {props.feelsLike}&deg;F</p>
        <p>Pressure: {props.pressure}mb</p>
        <p>Humidity: {props.humidity}%</p>
      </div>
    </div>
  );
};

export default Card;