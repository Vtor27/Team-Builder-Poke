package com.teambuilder.domain;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "region")
@Data
public class Region {
	
	@Id
	private Integer id;
	
	private String name;

	@OneToMany(mappedBy = "region")
	private List<RegionApparitions> regionApparitions;

	@OneToMany(mappedBy = "regionOrigin")
	private List<Pokemon> originRegion;
}

