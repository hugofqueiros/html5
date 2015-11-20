<div class="row">
    <% var count = 1 %>
    <% data.model.each(function(obj, i) { %>
    <div id="starship<%= i %>" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 fade-in fade-in-<%= count %>"></div>
    <% if(count === 4) { count = 0 } %>
    <% count++ %>
    <% }); %>
</div>