<div class="Card-header">
    <div class="Card-title--small">
        <%= data.title %>
    </div>
</div>
<div class="Card-body">
    <% if(data.type === 'person') { %>
        <span class="Card-text">
            <div>Birth Year:</div>
            <div><%= data.model.get('birth_year') %></div>
        </span>
        <span class="Card-text">
            <div>Eye color:</div>
            <div><%= data.model.get('eye_color') %></div>
        </span>
        <span class="Card-text">
            <div>Gender:</div>
            <div><%= data.model.get('gender') %></div>
        </span>
        <span class="Card-text">
            <div>Hair Color:</div>
            <div><%= data.model.get('hair_color') %></div>
        </span>
        <span class="Card-text">
            <div>Height:</div>
            <div><%= data.model.get('height') %></div>
        </span>
        <span class="Card-text">
            <div>Mass:</div>
            <div><%= data.model.get('mass') %></div>
        </span>
        <span class="Card-text">
            <div>Skin Color:</div>
            <div><%= data.model.get('skin_color') %></div>
        </span>
        <span class="Card-text">
            <div>Homeworld:</div>
            <div><%= data.planet %></div>
        </span>
    <!--
            <span class="Card-text">
                <div>Films:</div>
                <div><%= data.model.get('films') %></div>
            </span>
            <span class="Card-text">
                <div>Species:</div>
                <div><%= data.model.get('species') %></div>
            </span>
            <span class="Card-text">
                <div>Starships:</div>
                <div><%= data.model.get('starships') %></div>
            </span>
            <span class="Card-text">
                <div>Vehicles:</div>
                <div><%= data.model.get('vehicles') %></div>
            </span>-->
        <span class="Card-text">
            <div>Created:</div>
            <div><%= data.created %></div>
        </span>
        <span class="Card-text">
            <div>Edited:</div>
            <div><%= data.edited %></div>
        </span>
    <% } else if (data.type === 'planet') { %>
        <span class="Card-text">
            <div>Climate:</div>
            <div><%= data.model.get('climate') %></div>
        </span>
        <span class="Card-text">
            <div>Diameter:</div>
            <div><%= data.model.get('diameter') %></div>
        </span>
        <span class="Card-text">
            <div>Gravity:</div>
            <div><%= data.model.get('gravity') %></div>
        </span>
        <span class="Card-text">
            <div>Orbital Period:</div>
            <div><%= data.model.get('orbital_period') %></div>
        </span>
        <span class="Card-text">
            <div>Population:</div>
            <div><%= data.model.get('population') %></div>
        </span>
        <span class="Card-text">
            <div>Rotation Period:</div>
            <div><%= data.model.get('rotation_period') %></div>
        </span>
        <span class="Card-text">
            <div>Surface Water:</div>
            <div><%= data.model.get('surface_water') %></div>
        </span>
        <span class="Card-text">
            <div>Terrain:</div>
            <div><%= data.model.get('terrain') %></div>
        </span>

    <% } else if (data.type === 'film') { %>
        <span class="Card-text">
                <div>Directon:</div>
            <div><%= data.model.get('director') %></div>
        </span>
        <span class="Card-text">
            <div>Producer:</div>
            <div><%= data.model.get('producer') %></div>
        </span>
        <span class="Card-text">
            <div>Release Date:</div>
            <div><%= data.model.get('release_date') %></div>
        </span>
    <% } else if (data.type === 'vehicle') { %>
        <span class="Card-text">
            <div>Cargo capacity:</div>
            <div><%= data.model.get('cargo_capacity') %></div>
        </span>
    <span class="Card-text">
            <div>Crew:</div>
            <div><%= data.model.get('crew') %></div>
        </span>
    <span class="Card-text">
            <div>Cost in Credits:</div>
            <div><%= data.model.get('cost_in_credits') %></div>
        </span>
    <span class="Card-text">
            <div>Vehicle Class:</div>
            <div><%= data.model.get('vehicle_class') %></div>
        </span>
    <span class="Card-text">
            <div>Length:</div>
            <div><%= data.model.get('length') %></div>
        </span>
    <span class="Card-text">
            <div>Manufacturer:</div>
            <div><%= data.model.get('manufacturer') %></div>
        </span>
    <% } else if (data.type === 'specie') { %>
        <span class="Card-text">
            <div>Average Height:</div>
            <div><%= data.model.get('average_height') %></div>
        </span>
        <span class="Card-text">
            <div>Average Lifespan:</div>
            <div><%= data.model.get('average_lifespan') %></div>
        </span>
        <span class="Card-text">
            <div>Classification:</div>
            <div><%= data.model.get('classification') %></div>
        </span>
        <span class="Card-text">
            <div>Designation:</div>
            <div><%= data.model.get('designation') %></div>
        </span>
        <span class="Card-text">
            <div>Eye Colors:</div>
            <div><%= data.model.get('eye_colors') %></div>
        </span>
        <span class="Card-text">
            <div>Hair Colors:</div>
            <div><%= data.model.get('Hair Colors') %></div>
        </span>
        <span class="Card-text">
            <div>Language:</div>
            <div><%= data.model.get('language') %></div>
        </span>
        <span class="Card-text">
            <div>Skin Colors:</div>
            <div><%= data.model.get('skin_colors') %></div>
        </span>
    <% } else if (data.type === 'starship') { %>
        <span class="Card-text">
            <div>MGLT:</div>
            <div><%= data.model.get('MGLT') %></div>
        </span>
        <span class="Card-text">
            <div>Cost In Credits:</div>
            <div><%= data.model.get('cost_in_credits') %></div>
        </span>
        <span class="Card-text">
            <div>Crew:</div>
            <div><%= data.model.get('crew') %></div>
        </span>
        <span class="Card-text">
            <div>Passengers:</div>
            <div><%= data.model.get('passengers') %></div>
        </span>
    <% } %>
    <span class="Card-text">
        <div>Created:</div>
        <div><%= data.created %></div>
    </span>
    <span class="Card-text">
        <div>Edited:</div>
        <div><%= data.edited %></div>
    </span>
</div>

