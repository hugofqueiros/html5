<div class="row">
    <div class="search-section">
        <select class="selectize" name="search" id="search">
            <option value="">Select a Person</option>
        </select>
    </div>
</div>
<div class="row">
    <% var count = 1 %>
    <% data.model.each(function(obj, i) { %>
    <div id="person<%= i %>" class="col-xs-12 col-sm-3 col-md-3 col-lg-3 person<%= i %> fade-in fade-in-<%= count %>"></div>
    <% if(count === 4) { count = 0 } %>
    <% count++ %>
    <% }); %>
</div>