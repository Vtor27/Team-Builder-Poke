package com.teambuilder.domain;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString(exclude = {"pokemon", "region"})
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "region_apparitions")
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
