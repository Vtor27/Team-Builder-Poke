package com.teambuilder.domain;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "region_apparitions")
@Data
public class RegionApparitions {
	@Id
	@ManyToOne
	@JoinColumn(name = "pokemon_id")
	private Pokemon pokemon;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "region_id")
	private Region region;
}
