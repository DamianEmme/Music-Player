import React from "react";
import PropTypes from "prop-types";

export default function PlayList(props) {
	return (
		<div id="lista" className="container col-3 bg-dark text-white">
			<div className="row justify-content-center align-items-center bg-dark text-white">
				<div className="col bg-dark text-white">
					<div className="list-group bg-dark text-white">
						{props.listaCanciones.map((cancion, index) => {
							return (
								<button
									key={index}
									className={`bg-dark text-white list-group-item list-group-item-action + ${
										index === props.actual ? "active" : ""
									}`}
									onClick={() => {
										props.Select(index);
									}}>
									<strong>{cancion.id}:</strong>{" "}
									{cancion.name}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

PlayList.propTypes = {
	listaCanciones: PropTypes.array,
	Select: PropTypes.func,
	actual: PropTypes.number
};
