import { Link, Outlet } from "react-router-dom";

export default function HelpLink() {
    return(
        <div className="help">
            <p>Это приложение предлагает следующие возможности:</p>
            <ul>
                <li>Узнать погоду на данный момент в любом городе</li>
                <li>Узнать прогноз погоды на весь день с промежутками в 3 часа</li>
                <li>Сохранять город в избранное по нажатию кнопки "Like" на главном экране</li>
            </ul>
            <Link to="/">Back to weather</Link>
        </div>
    );
}
