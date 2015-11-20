<div class="Card-header">
    <div class="Card-title--small">
        Same planet people
    </div>
</div>
<div class="Card-body">
    <% for(var i = 0; i < data.related.length; i++) { %>
             <span class="Card-text">
            <div>Name:</div>
            <div><%= data.related[i].name %></div>
        </span>
    <% } %>
</div>