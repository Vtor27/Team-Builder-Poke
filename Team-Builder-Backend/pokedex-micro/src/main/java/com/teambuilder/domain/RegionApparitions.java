package com.teambuilder.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "region_apparitions")
@Data
public class RegionApparitions {
	
	@EmbeddedId
	private RegionApparitionsId id;
	
	@ManyToOne
	@MapsId("pokemon")					//Indica el atributo al que se refiere en RegionApparitionsId. 
	@JoinColumn(name = "pokemon_id")
	private Pokemon pokemon;
	
	@ManyToOne
	@MapsId("region")
	@JoinColumn(name = "region_id")
	private Region region;
}
